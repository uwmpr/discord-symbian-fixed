tutorial how to setup a discord proxy
you must have a server with nginx/apache2
I give here config for nginx

'''


	server {

    listen 80;

    server_name discord.yourdomain.com;

    location / {
        resolver 8.8.8.8;
        proxy_intercept_errors on;
        proxy_pass https://discord.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }}
'''

and here config for a cdn proxy
'''
		
	server {
    listen 80;

    server_name discord.yourdomain.com;

    location / {
        resolver 8.8.8.8;
        proxy_intercept_errors on;
        proxy_pass https://cdn.discordapp.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
	}
'''
	
