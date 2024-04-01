## Uses
I use this with my phone so that way I can set my phone on my laptop and unlock it (when my phone is unlocked of course), I recommend using this with Tailscale to provide consistent access and security.

## Installation
```
git clone https://github.com/ToasterWithTheBread/UbuntuUnlock
cd UbuntuUnlock
sudo nano .env
```

>Now is when you should change the enviroment variables to make the service more secure

```
chmod +x install.sh
./install.sh
```

## How to setup iPhone shortcut (denglish (sorry))
You should purchase NFC tags, then if you have an iPhone create a new Kurzbefehl (Shortcut?), inside of the shortcut you should have a URL object which is **http://[your-tailscale-ip]:1000/unlock?code=[your-unique-code]**,
then you should add a call to the URL (Inhalte von URL abrufen) with a GET request.

## Routes
**http://[your-tailscale-ip]:1000/**

**http://[your-tailscale-ip]:1000/unlock?code=[your-unique-code]**

**http://[your-tailscale-ip]:1000/lock?code=[your-unique-code]**
