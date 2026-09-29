terraform {
  required_version = ">= 1.16.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "solar_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "solar-system-vpc"
  }
}

resource "aws_subnet" "solar_public_subnet" {
  vpc_id                  = aws_vpc.solar_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "solar-system-public-subnet"
  }
}
resource "aws_internet_gateway" "solar_igw" {
  vpc_id = aws_vpc.solar_vpc.id

  tags = {
    Name = "solar-system-igw"
  }
}
resource "aws_route_table" "solar_public_rt" {
  vpc_id = aws_vpc.solar_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.solar_igw.id
  }

  tags = {
    Name = "solar-system-public-route-table"
  }
}

resource "aws_route_table_association" "solar_public_rta" {
  subnet_id      = aws_subnet.solar_public_subnet.id
  route_table_id = aws_route_table.solar_public_rt.id
}
resource "aws_security_group" "solar_web_sg" {
  name        = "solar-system-web-sg"
  description = "Allow HTTP and SSH access"
  vpc_id      = aws_vpc.solar_vpc.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "solar-system-web-sg"
  }
}
resource "aws_instance" "solar_server" {
  ami                    = "ami-0a2601fa32a0e773d"
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.solar_public_subnet.id
  vpc_security_group_ids = [aws_security_group.solar_web_sg.id]

  associate_public_ip_address = true
  iam_instance_profile        = aws_iam_instance_profile.solar_ssm_profile.name
  tags = {
    Name = "solar-system-server"
  }
}
resource "aws_iam_role" "solar_ssm_role" {
  name = "solar-system-ssm-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "solar_ssm_policy" {
  role       = aws_iam_role.solar_ssm_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_instance_profile" "solar_ssm_profile" {
  name = "solar-system-ssm-profile"
  role = aws_iam_role.solar_ssm_role.name
}
resource "aws_subnet" "solar_eks_subnet" {
  vpc_id                  = aws_vpc.solar_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "solar-system-eks-subnet"
  }
}
resource "aws_iam_role" "eks_cluster_role" {
  name = "solar-system-eks-cluster-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "eks.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eks_cluster_policy" {
  role       = aws_iam_role.eks_cluster_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}
resource "aws_eks_cluster" "solar_eks" {
  name     = "solar-system-eks"
  role_arn = aws_iam_role.eks_cluster_role.arn

  vpc_config {
    subnet_ids = [
      aws_subnet.solar_public_subnet.id,
      aws_subnet.solar_eks_subnet.id
    ]

    endpoint_public_access  = true
    endpoint_private_access = false
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_cluster_policy
  ]
}

data "tls_certificate" "eks_oidc" {
  url = aws_eks_cluster.solar_eks.identity[0].oidc[0].issuer
}

resource "aws_iam_openid_connect_provider" "eks_oidc" {
  url = aws_eks_cluster.solar_eks.identity[0].oidc[0].issuer

  client_id_list = [
    "sts.amazonaws.com"
  ]

  thumbprint_list = [
    data.tls_certificate.eks_oidc.certificates[0].sha1_fingerprint
  ]
}


resource "aws_iam_role" "eks_node_role" {
  name = "solar-system-eks-node-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "eks_node_worker_policy" {
  role       = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
}

resource "aws_iam_role_policy_attachment" "eks_node_cni_policy" {
  role       = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
}

resource "aws_iam_role_policy_attachment" "eks_node_ecr_policy" {
  role       = aws_iam_role.eks_node_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPullOnly"
}
resource "aws_eks_node_group" "solar_nodes" {
  cluster_name    = aws_eks_cluster.solar_eks.name
  node_group_name = "solar-system-node-group"
  node_role_arn   = aws_iam_role.eks_node_role.arn

  subnet_ids = [
    aws_subnet.solar_public_subnet.id,
    aws_subnet.solar_eks_subnet.id
  ]

  instance_types = ["t3.small"]

  scaling_config {
    desired_size = 3
    min_size     = 1
    max_size     = 3
  }

  depends_on = [
    aws_iam_role_policy_attachment.eks_node_worker_policy,
    aws_iam_role_policy_attachment.eks_node_cni_policy,
    aws_iam_role_policy_attachment.eks_node_ecr_policy
  ]
}
resource "aws_route_table_association" "solar_eks_rta" {
  subnet_id      = aws_subnet.solar_eks_subnet.id
  route_table_id = aws_route_table.solar_public_rt.id
}