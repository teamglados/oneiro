resource "aws_elb" "ServerLB" {
  name = "Server-lb"
  security_groups = ["${aws_security_group.Cloud.id}"]
  subnets = ["${aws_subnet.Cloud.id}"]

  connection_draining = true
  cross_zone_load_balancing = true
  idle_timeout = 3600

  instances = ["${aws_instance.Server.id}"]

  listener {
    instance_port = 8000
    instance_protocol = "tcp"
    lb_port = 443
    lb_protocol = "ssl"
    ssl_certificate_id = "${var.ACM-teamglados-com-arn}"
  }

  listener {
    instance_port = 22
    instance_protocol = "tcp"
    lb_port = 22
    lb_protocol = "tcp"
  }

  health_check {
    healthy_threshold = 2
    unhealthy_threshold = 10
    target = "TCP:22"
    interval = 10
    timeout = 5
  }

  tags {
    Name = "Server Load Balancer"
    Environment = "dev"
  }
}
