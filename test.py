import time
import unittest
from unittest import TestCase

import pytest
import requests
import json
import logging
import socket


class XharkTankAssessment(TestCase):

    HEADERS = None
    maxDiff = None

    def __init__(self, *args, **kwargs):
        unittest.TestCase.__init__(self, *args, **kwargs)
        self.HEADERS = {"Content-Type": "application/json"} # "X-Firebase-Auth": "INTERNAL_IMPERSONATE_USER_" + str(user),
        self.localhost = 'http://localhost:8081/'

        self.POSITIVE_STATUS_CODES = [200, 201, 202, 203]
        self.NEGATIVE_STATUS_CODES = [400, 401, 402, 403, 404, 405, 409]

    ### Helper functions
    def get_api(self, endpoint):

        response = requests.get(self.localhost + endpoint, headers=self.HEADERS,timeout=10)
        self.print_curl_request_and_response(response)
        return response

    def post_api(self, endpoint, body):

        response = requests.post(self.localhost + endpoint, headers=self.HEADERS,timeout=10, data=body)
        self.print_curl_request_and_response(response)
        return response

    def print_curl_request_and_response(self, response):

        if(response.status_code in self.POSITIVE_STATUS_CODES):

            self.decode_and_load_json(response)

    def patch_api(self, endpoint, body):

        response = self.http.patch(self.localhost + endpoint, headers = self.HEADERS,data = body)
        self.print_curl_request_and_response(response)
        return response

    def decode_and_load_json(self, response):
        try:
            text_response = response.content.decode('utf-8')
            # print(text_response)
            data = json.loads(text_response)
        except Exception as e:

            logging.exception(str(e))
            return response
        return data

    def checkKey(self,dict,key):
        if key in dict:
            return True
        else:
            return False

    def check_server(self,address, port):
    # Create a TCP socket
        s = socket.socket()
    # print("Attempting to connect to {} on port {}".format(address, port))
        try:
            s.connect((address, port))
            # print( "Connected to %s on port %s" % (address, port))
            return True
        except socket.error:
            # print ("Connection to %s on port %s failed" % (address, port))
            return False
        finally:
            s.close()

    ### Helper functions end here

    @pytest.fixture(autouse=True)
    def slow_down_tests(self):
        yield
        time.sleep(5)

    @pytest.mark.order(0)
    def test_0_check_server_run_port_8081(self):
        """Verify if backend is running at port 8081"""
        status = self.check_server("localhost",8081)
        self.assertTrue(status)