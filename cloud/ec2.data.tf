data "template_file" "InitServer" {
  template = "${file("init.sh")}"
  vars {
    foo = "bar"
  }
}
