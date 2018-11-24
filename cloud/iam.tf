data "aws_iam_policy_document" "DataECRIAMAssumeRole" {
  statement {
    sid = "EC2AssumeRole"
    effect = "Allow"
    actions = ["sts:AssumeRole"]
    principals = {
      type = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "DataECRIAMToken" {
  statement {
    sid = "ECRGetAuthorizationToken"
    effect = "Allow"
    actions = ["ecr:GetAuthorizationToken"]
    resources = ["*"]
  }
}

data "aws_iam_policy_document" "DataECRPolicy" {
  count = 1
  statement {
    sid = "ecr"
    effect = "Allow"
    principals = {
      type = "AWS"
      identifiers = [
        "${aws_iam_role.Server.arn}",
      ]
    }
    actions = [
      "ecr:GetAuthorizationToken",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage",
      "ecr:InitiateLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:CompleteLayerUpload",
      "ecr:DescribeRepositories",
      "ecr:ListImages",
      "ecr:DescribeImages",
    ]
  }
}

resource "aws_iam_policy" "GetECRToken" {
  name = "GetECRToken"
  description = "Allow IAM Users to call ecr:GetAuthorizationToken"
  policy = "${data.aws_iam_policy_document.DataECRIAMToken.json}"
}

resource "aws_iam_role_policy_attachment" "ECR" {
  count = 1
  role = "${aws_iam_role.Server.name}"
  policy_arn = "${aws_iam_policy.GetECRToken.arn}"
}

resource "aws_iam_role" "Server" {
  name = "server"
  count = 1
  assume_role_policy = "${data.aws_iam_policy_document.DataECRIAMAssumeRole.json}"
}

resource "aws_iam_instance_profile" "Server" {
  name = "server"
  count = 1
  role = "${aws_iam_role.Server.name}"
}
