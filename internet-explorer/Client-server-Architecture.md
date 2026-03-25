# Assignment 1 (09/02/2026)

## Internet Explorer - Client-Server Architecture and What Happens When We Open a Website

## 1) Client-Server Architecture

Client-server architecture is a simple model where one side asks for data and the other side gives data.

- Client: Browser or app used by user (Chrome, Firefox, Internet Explorer)
- Server: Computer where website files and data are stored

In short:
1. Client sends request.
2. Server receives request.
3. Server sends response.
4. Client shows output to user.

### Diagram 1: Basic Client-Server Architecture

User
    |
    v
Client Browser
    |
    | HTTP/HTTPS Request
    v
Web Server
    |
    | Response: HTML, CSS, JS, Images, Data
    v
Client Browser
    |
    v
User sees webpage

---

## 2) What Happens When We Open a Website

Example: we type www.example.com in browser.

### Step-by-step trace

1. URL is entered in browser.
2. Browser checks cache first.
3. If not in cache, browser asks DNS for IP address.
4. DNS returns IP address.
5. Browser sends HTTP/HTTPS request to server IP.
6. Server processes request and prepares response.
7. Server sends files back (HTML, CSS, JS, images, data).
8. Browser renders page on screen.
9. Browser may send extra requests for API data, fonts, images, ads.

### Diagram 2: Website Opening Flow

Step 1: User enters URL in browser
    |
Step 2: Browser checks cache
    |
Step 3: Browser asks DNS for IP
    |
Step 4: DNS returns IP address
    |
Step 5: Browser sends request to server
    |
Step 6: Server processes request
    |
Step 7: Server sends response files
    |
Step 8: Browser renders page
    |
Step 9: User sees website

## 3) Final Notes

- HTTP means data transfer between browser and server.
- HTTPS means same process but secure (encrypted).
- DNS is like phonebook of internet.
- Without server response, browser cannot show the website.

So, opening any website is basically a request-response process between client and server.