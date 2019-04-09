This application is designed to be used in a Docker container for live 
reloading and serving of files that are bind mounted to the 
***/home/node/html*** directory without the need for a live reload browser 
plugin.

You will need to map and expose port 8000 to the port you wish to use as your
web server port.

By default the reload server is configured to send the reload script tag to
point to ***localhost:35729***

Therefore, you will also need to map and expose port ***35729*** to the port
you wish to use.

These values can be overriden if the broswer is running on a different server
or if that port is in use by setting the env variables ***RELOAD_HOST*** and 
***RELOAD_PORT*** respectively.

For example adding this to the docker run command:

```
-e RELOAD_HOST=$(hostname)
```

To run a docker container from this image run something like this:

```
> docker container run -p 35729:35729 -p 8000:8000 \
                       --mount type=bind,src=$PWD,dst=/home/node/html \
                       -e RELOAD_HOST=$(hostname) \
                       blackeyetechnology/reload-server
```

