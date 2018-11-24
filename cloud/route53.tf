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

# Heatmap CDN
resource "aws_route53_record" "HeatmapCDN" {
  zone_id = "${var.ZoneID-teamglados-com}"
  name = "heatmap.teamglados.com"
  type = "A"
  alias {
    name = "${aws_cloudfront_distribution.Heatmap.domain_name}"
    zone_id = "Z2FDTNDATAQYW2"
    evaluate_target_health = false
  }
}
