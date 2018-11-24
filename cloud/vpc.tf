data "aws_availability_zones" "available" {}

resource "aws_vpc" "Cloud" {
  cidr_block = "${var.CloudFullCIDR}"
  enable_dns_support = true
  enable_dns_hostnames = true
  tags {
    Name = "Main VPC"
    Environment = "dev"
  }
}

# Open ACL, rules will be enforced by security groups
resource "aws_network_acl" "Open" {
  vpc_id = "${aws_vpc.Cloud.id}"
  subnet_ids = ["${aws_subnet.Cloud.id}"]
  egress {
    protocol = "-1"
    rule_no = 2
    action = "allow"
    cidr_block =  "0.0.0.0/0"
    from_port = 0
    to_port = 0
  }
  ingress {
    protocol = "-1"
    rule_no = 1
    action = "allow"
    cidr_block =  "0.0.0.0/0"
    from_port = 0
    to_port = 0
  }
  tags {
    Name = "Open ACL"
    Environment = "dev"
  }
}

resource "aws_internet_gateway" "CloudGW" {
  vpc_id = "${aws_vpc.Cloud.id}"
  tags {
    Name = "Cloud Gateway"
    Environment = "dev"
  }
}

resource "aws_subnet" "Cloud" {
  vpc_id = "${aws_vpc.Cloud.id}"
  cidr_block = "${var.SubnetCIDR}"
  availability_zone = "${data.aws_availability_zones.available.names[0]}"
  tags {
    Name = "Cloud"
    Environment = "dev"
  }
}

resource "aws_route_table" "Cloud" {
  vpc_id = "${aws_vpc.Cloud.id}"
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.CloudGW.id}"
  }
  tags {
    Name = "Cloud Route Table"
    Environment = "dev"
  }
}

resource "aws_route_table_association" "Cloud" {
  subnet_id = "${aws_subnet.Cloud.id}"
  route_table_id = "${aws_route_table.Cloud.id}"
}
