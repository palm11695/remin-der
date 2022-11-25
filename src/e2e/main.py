import undetected_chromedriver as uc
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

from selenium_stealth import stealth
import os

from time import sleep

from selenium.webdriver.chrome.options import Options
options = Options()
options.page_load_strategy = 'eager'

from dotenv import load_dotenv

load_dotenv()

GOOGLE_USERNAME = os.getenv("GOOGLE_USERNAME")
GOOGLE_PASSWORD = os.getenv("GOOGLE_PASSWORD")


def test_login():
    # driver = webdriver.Chrome(ChromeDriverManager.install())
    # driver = webdriver.Chrome(ChromeDriverManager().install())
    driver = uc.Chrome(use_subprocess=True)
    wait = WebDriverWait(driver, 10)

    # stealth(driver,
    #         user_agent='DN',
    #         languages=["en-US", "en"],
    #         vendor="Google Inc.",
    #         platform="Win32",
    #         webgl_vendor="Intel Inc.",
    #         renderer="Intel Iris OpenGL Engine",
    #         fix_hairline=True,
    #         )



    driver.get("http://remin-der.th1.proen.cloud/")
    # driver.get("http://localhost:3000/")

    driver.implicitly_wait(10)

    login_button = driver.find_element(By.XPATH, "//button[1]")
    login_button.click()

    # username_input = driver.find_element(By.XPATH, "//input[@id='Email']")
    username_input = driver.find_element(By.XPATH, "//input[@name='identifier']")
    username_input.send_keys(GOOGLE_USERNAME)
    username_input.send_keys(Keys.ENTER)




    # password_input = driver.find_element(By.XPATH, "//input[@id='Password']")
    password_input = driver.find_element(By.XPATH, "//input[@name='password']")
    password_input.send_keys(GOOGLE_PASSWORD)
    password_input.send_keys(Keys.ENTER)

    sleep(10)
    assert driver.find_element(By.XPATH, "//h1[1]").text == "Remind-เด้อ"
    # sleep(999)
    print("Login Success")
    driver.quit()

test_login()
