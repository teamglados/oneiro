resource "aws_security_group" "Cloud" {
  name = "Cloud"
  description = "all outbound, all inbound"
  vpc_id = "${aws_vpc.Cloud.id}"

  ingress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags {
    Name = "Cloud Security Group"
    Environment = "dev"
  }
}
