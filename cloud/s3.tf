resource "aws_s3_bucket" "Heatmap" {
  bucket = "heatmap.teamglados.com"
  acl = "public-read"
  policy = <<POLICY
{
  "Version":"2012-10-17",
  "Statement":[{
    "Sid":"PublicReadForGetBucketObjects",
    "Effect":"Allow",
    "Principal": "*",
    "Action":"s3:GetObject",
    "Resource":[
      "arn:aws:s3:::heatmap.teamglados.com/*"
    ]
  }]
}
POLICY

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}
