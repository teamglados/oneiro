#!/bin/bash -ex

# Log console output and commands to file
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

# Add Docker repository and update apt
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt update -y

# Ville Toiviainen
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDGf643ebrWpPxssQqKPXU0VqfLFUu2i9FADTWYtfEHmZhgOtP+RtibCjn9ZEf2iyCMJ4KrefbvO6inTBo4AojiUDmtNUDU9hej9czC6LUOp3p7kOrLDYmRteWJauR8AfcDpe402XOwcEwIlmrqXoON4YV1f8Z4LRFB4WEQrhPM9IaNJlx9YiNHW/6Cvmqrz9XWtC2JDUmDS2RAem4Fd5KzzQphCVwC2Je7iA5EWCkZ7CXDmKeGHG/73DVqYaihReApPEjGrKtNvQExucHzZb1LwpPbT9hRbrd/mIvtIV6HIHEJnlNlqpYFeRq0M7VlVYlInsSgeLIDXx3FqdAs4GIJ" >> /root/.ssh/authorized_keys
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDGf643ebrWpPxssQqKPXU0VqfLFUu2i9FADTWYtfEHmZhgOtP+RtibCjn9ZEf2iyCMJ4KrefbvO6inTBo4AojiUDmtNUDU9hej9czC6LUOp3p7kOrLDYmRteWJauR8AfcDpe402XOwcEwIlmrqXoON4YV1f8Z4LRFB4WEQrhPM9IaNJlx9YiNHW/6Cvmqrz9XWtC2JDUmDS2RAem4Fd5KzzQphCVwC2Je7iA5EWCkZ7CXDmKeGHG/73DVqYaihReApPEjGrKtNvQExucHzZb1LwpPbT9hRbrd/mIvtIV6HIHEJnlNlqpYFeRq0M7VlVYlInsSgeLIDXx3FqdAs4GIJ" >> /home/ubuntu/.ssh/authorized_keys

# Andreas Urbanski
# deployer-key

# Install packages
apt install docker-ce htop -y

# Add "ubuntu" user to docker group
usermod -aG docker ubuntu
