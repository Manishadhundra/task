provider "aws" {
    access_key= 
    secret_key=
    region    = eu-west-2
}

data "aws_vpc" "VPC" {
    default = true
}


resource "aws_instance" "jenkins_server" {
  ami           = 
  instance_type = t2.micro

  key_name = var.manisha_laptop

  vpc_security_group_ids = [aws_security_group.jenkins_security_group.id]

  root_block_device {
    volume_size = 20
  }

  tags = {
    Name = "jenkins-server2"
  }
}

resource "aws_security_group" "jenkins_security_group" {
  name        = "jenkins_sg"
  description = "Allow web and ssh"
  vpc_id      = "${data.aws_vpc.VPC.id}"


  ingress {
    description      = "web"
    from_port        = 80
    to_port          = 80
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }


ingress {
    description      = "ssh"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = ["0.0.0.0/0"]
  }
  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
  }

  tags = {
    Name = "jenkins_sg"
  }
}
