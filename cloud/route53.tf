# Server load balancer
resource "aws_route53_record" "ServerLB" {
  zone_id = "${var.ZoneID-teamglados-com}"
  name = "api.teamglados.com"
  type = "A"
  alias {
    name = "${aws_elb.ServerLB.dns_name}"
    zone_id = "${aws_elb.ServerLB.zone_id}"
    evaluate_target_health = false
  }
}
