Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/xenial64"
    config.vm.hostname = "ubuntu64"

    #config.vm.network "private_network", ip: "190.90.90.90"
    config.vm.network "forwarded_port", guest: 80, host: 8080
    config.vm.network "forwarded_port", guest: 3306, host: 3306
    config.vm.network "forwarded_port", guest: 5432, host: 5432

    config.vm.synced_folder '.', '/home/vagrant/code/'
    
    config.vm.provision :shell, path: "revisions/bootstrap.sh"

    config.vm.provider "virtualbox" do |vb|
        vb.memory="2048"
    end
end
