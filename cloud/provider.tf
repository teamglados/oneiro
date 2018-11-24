provider "aws" {
  version = "~> 1.31.0"
  shared_credentials_file = "${var.AwsCredentials}"
  profile = "${var.AwsProfile}"
  region = "${var.AwsRegion}"
}

resource "aws_key_pair" "deployer" {
  key_name = "${var.DeployerKeyName}"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDNLRLyKyYwoC8JZJ8FfWjNvbl9SbeJ6ob7vcMe6w8i73FgmthRWTmbm0u2qyJTQMsdgWUKfHeVUDniXkNdckCCEzxQ0CFUsuW4GLnWhT6tXiultdJJelQZ99eGdHUVNmdEzsu7WROusT2H5vupPrSICrpmwevBDzm7rwvKVrL0oJ79F3/nv1QA4zIdcrsX54zN5Yw1usLExy3/WhMfLBXlLS+hyqnn688RSW1K4pLVkkD4Cl5jVs4Eshhb2i9be0d9v4xBdZOQiigPzoI/3b/TylvlAmwr8IsFXH/wq38X7qFH5FLGOXNEdD9rtnRMbw52iD5XtxBpvV/PGnnN5Wxn andreas@silver.local"
}
