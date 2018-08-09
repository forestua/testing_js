# php7.1, nginx, PostgreSQL
#let db_name=forge
#let db_user=forge

debconf-set-selections <<< 'mariadb-server mysql-server/root_password password root'
debconf-set-selections <<< 'mariadb-server mysql-server/root_password_again password root'

apt-add-repository ppa:ondrej/php -y
add-apt-repository ppa:nginx/development -y
apt update -y

apt install -y git curl nano vim openssl mcrypt wget build-essential unzip nginx

apt install -y php7.1 php7.1-pgsql php7.1-curl php7.1-cli php7.1-mbstring php7.1-xml php7.1-json php7.1-mcrypt php7.1-fpm php7.1-zip 

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
sudo mv composer.phar /usr/local/bin/composer

#nginx

ufw allow 'Nginx HTTP'

echo "deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main" > /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update

sudo chmod -R 777 /home/vagrant/code/
sudo chown -R $USER:$USER /home/vagrant/code/

cd /home/vagrant/code

composer global require hirak/prestissimo
composer install

sudo chmod -R 777 /home/vagrant/code/

# PHP and nginx config setup
sed -i "s/error_reporting = .*/error_reporting = E_ALL/" /etc/php/7.1/fpm/php.ini
sed -i "s/display_errors = .*/display_errors = On/" /etc/php/7.1/fpm/php.ini
sed -i "s/user .*;/user www-data;/" /etc/nginx/nginx.conf
echo "cgi.fix_pathinfo = 0" >> /etc/php/7.1/fpm/php.ini
echo "date.timezone = \"Europe/London\"" >> /etc/php/7.1/fpm/php.ini

# nodejs
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

#copy nginx site conf
rm /etc/nginx/sites-enabled/default
rm /etc/nginx/sites-available/default

cp /home/vagrant/code/revisions/nginx-config/nginx-vhost.conf /etc/nginx/conf.d/default.conf
cp /home/vagrant/code/revisions/nginx-config/nginx-vhost.conf /etc/nginx/sites-available/default.conf
# ln -s /etc/nginx/sites-available/default.conf /etc/nginx/sites-enabled/default.conf

systemctl restart nginx.service

echo 'deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main' >> /etc/apt/sources.list.d/pgdg.list
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
apt-get install -y postgresql-10

# Configure Postgres Remote Access
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/10/main/postgresql.conf
echo "host    all             all             10.0.2.2/32               md5" | tee -a /etc/postgresql/10/main/pg_hba.conf
sudo -u postgres psql -c "CREATE ROLE forge LOGIN PASSWORD '1111' SUPERUSER INHERIT NOCREATEDB NOCREATEROLE NOREPLICATION;"
sudo -u postgres /usr/bin/createdb --echo --owner=forge forge
service postgresql restart

#
php artisan migrate 