# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.disksize.size = '50GB'

  config.vm.network "forwarded_port", guest: 5672, host: 5672       # Rabbitmq
  config.vm.network "forwarded_port", guest: 15672, host: 15672     # Rabbitmq dashboard
  config.vm.network "forwarded_port", guest: 4000, host: 4000
  config.vm.network "forwarded_port", guest: 4001, host: 4001
  config.vm.network "forwarded_port", guest: 4002, host: 4002

  config.vm.provision "shell", path: "./scripts/provision-dev-vm.sh"
end
