# node-file-uploader

Simple Node.js file uploader

### installing app
`$ ln -s /home/user/node-file-uploader /opt/app/node-file-uploader`

### add firewall rules
`$ sudo firewall-cmd --permanent --add-port=3000/tcp`

`$ sudo firewall-cmd --reload`

### add config for service
`$ ln -s /opt/app/node-file-uploader/init.d/node-file-uploader /etc/rc.d/init.d/node-file-uploader`

`$ sudo chmod +x /etc/rc.d/init.d/node-file-uploader`

`$ sudo service node-file-uploader start`

`$ sudo chkconfig node-file-uploader on`

### NGINX configuration for CentOS 7
`$ ln -s /opt/app/node-file-uploader/node-file-uploader.conf /etc/nginx/conf.d/node-file-uploader.conf`

`$ sudo pkill -f nginx`

`$ sudo systmctl start nginx`
