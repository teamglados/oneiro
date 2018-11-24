resource "aws_ecr_repository" "Glados" {
  name = "glados"
}

resource "aws_ecr_repository_policy" "Glados" {
  count = 1
  repository = "${aws_ecr_repository.Glados.name}"
  policy = "${data.aws_iam_policy_document.DataECRPolicy.json}"
}
