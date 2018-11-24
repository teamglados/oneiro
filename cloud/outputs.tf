output "server_public" {
  value = "${aws_instance.Server.public_dns}"
}

output "server_public_ip" {
  value = "${aws_instance.Server.public_ip}"
}
