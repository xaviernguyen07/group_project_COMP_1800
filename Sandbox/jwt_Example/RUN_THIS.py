#!/usr/bin/python3
import time
import requests

URL = 'http://localhost:3000/api/login'
stuff = {'username':'myusername',
        'email': 'myemail'}

protected_URL = 'http://localhost:3000/api/protected'



def decorator_blank_line_and_sleep(function):
    """ This decorator just waits one second and prints a blank line after executing function"""
    def inner_wrapper(*args, **kwargs):
        input("")
        value = function(*args, **kwargs)
        print()
        return value
    return inner_wrapper

@decorator_blank_line_and_sleep
def print_Shit(string_to_print):
    print(string_to_print)


def main():

    print("This program emulates a client attempting to access stuff from our server\n")
    print("It will do the following things: \n\t1) Send a post request to recieve a token. \n\t2)Send a post request including token to a protected endpoint \n\t3)Wait 30 seconds and send the same request again to show that the token expires.")
    print("Press enter to preceed with every step")
    print_Shit(f"Sending a post request to url: {URL} \n\t with data: {stuff} in 3 seconds...")
    response = requests.post(URL, data=stuff)
    auth_token = response.json()["token"]
    print_Shit(f"Recieved response from {URL} \n\t containing: {response.text}")
    print_Shit(f"Now simulating a request to a protected Endpoint {protected_URL}")

    auth_headers = { 'Authorization' : 'Bearer ' + auth_token}

    
    print_Shit(f"Sending a post request to url: {protected_URL} \n \t with headers: {auth_headers} \n \t in 3 seconds...")
    response2 = requests.post(protected_URL, headers=auth_headers)
    response2 = response2.json()
    print_Shit(f"Recieved the following response: {response2}")
    print(response2)

    print_Shit("waiting 30 seconds for the token to expire")
    print("The next request should be blocked as the token has expired")
    time.sleep(30)
    try:
        response2 = requests.post(protected_URL, headers=auth_headers)
        response2 = response2.json()
    
    except Exception as e:
        pass
    #    print(f"Error, recieved {response2}")
    
    print(f"Recieved the following response: {response2}")
    




if __name__ == '__main__':
    main()

