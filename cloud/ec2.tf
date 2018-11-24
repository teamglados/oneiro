resource "aws_instance" "Server" {
  ami = "${lookup(var.AwsUbuntuAMIs, var.AwsRegion)}"
  key_name = "${var.DeployerKeyName}"

  vpc_security_group_ids = ["${aws_security_group.Cloud.id}"]
  subnet_id = "${aws_subnet.Cloud.id}"

  availability_zone = "${data.aws_availability_zones.available.names[0]}"

  instance_type = "t2.nano"
  iam_instance_profile = "${aws_iam_instance_profile.Server.name}"
  associate_public_ip_address = true

  user_data = "${data.template_file.InitServer.rendered}"

  tags {
    Name = "Server"
    Environment = "dev"
  }
}
