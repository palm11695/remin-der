import undetected_chromedriver as uc
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager

#from selenium_stealth import stealth
import os

from time import sleep

from selenium.webdriver.chrome.options import Options
options = Options()
options.page_load_strategy = 'eager'

from dotenv import load_dotenv

load_dotenv()

GOOGLE_USERNAME = os.getenv("GOOGLE_USERNAME")
GOOGLE_PASSWORD = os.getenv("GOOGLE_PASSWORD")

# start driver
driver = uc.Chrome(use_subprocess=True)
wait = WebDriverWait(driver, 10)

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
print("Test login passed")
sleep(5)
#driver.quit()

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
    sleep(5)

def test_addtask():
  
    driver.get("http://remin-der.th1.proen.cloud/")
    # click add task button
    addtask_button = driver.find_element(By.XPATH, "//button[@class='ant-btn ant-btn-primary box-border border-black h-11 sm:max-w-sm w-80 inline-block px-6 py-2.5 bg-black text-white rounded-lg']")
    addtask_button.click()
    
    # input task name
    title_input = driver.find_element(By.XPATH, "//input[@placeholder='Task Title']")
    title_input.send_keys("Test title")
    
    # add tag
    tag_button = driver.find_element(By.XPATH, "//span[@class='ant-tag site-tag-plus']")
    tag_button.click()
    username_input = driver.find_element(By.XPATH, "//input[@class='ant-input ant-input-sm tag-input']")
    username_input.send_keys("Test tag")
    
    # add deadline
    deadline_button = driver.find_element(By.XPATH, "//div[@class='ant-picker']")
    deadline_button.click()
    date_input = driver.find_element(By.XPATH, "//input[@placeholder='Select date']")
    date_input.send_keys("2023-03-01 22:26:13")
    ok_button = driver.find_element(By.XPATH, "//button[@class='ant-btn ant-btn-primary ant-btn-sm']")
    ok_button.click()
    
    # add reminder
    reminder_button = driver.find_element(By.XPATH, "//button[@class='ant-btn ant-btn-default ant-dropdown-trigger w-[100px]']")
    reminder_button.click()
    reminderlist_button = driver.find_element(By.XPATH, "//li[@class='ant-dropdown-menu-item ant-dropdown-menu-item-only-child']")
    reminderlist_button.click()
    
    # add description
    des_input = driver.find_element(By.XPATH, "//p[@data-placeholder='Add description']")
    des_input.send_keys("Test description")
    
    # click add button
    add_button = driver.find_element(By.XPATH, "//button[@class='ant-btn ant-btn-primary box-border border-black h-11 sm:max-w-sm w-80 inline-block px-6 py-2.5 bg-black text-white rounded-lg']")
    add_button.click()
    
    sleep(5)
    
    assert driver.find_element(By.XPATH, "//div[@class='ant-card-body']").is_displayed()
    print("Test add task passed")
       
def test_removetask():
    
    sleep(5)
    driver.get("http://remin-der.th1.proen.cloud/")
    
    # click on task
    task_button = driver.find_element(By.XPATH, "//div[@class='ant-card-body']")
    task_button.click()
    sleep(2)
    
    # click delete button
    delete_button = driver.find_element(By.XPATH, "//button[@class='ant-btn ant-btn-danger bg-red-500 text-white rounded-xl hover:bg-red-300 border-red-500 border-none hover:text-white']")
    delete_button.click()
    sleep(2)
    
    # check Recently deleted
    driver.get("http://remin-der.th1.proen.cloud/delete")
    sleep(5)
    assert driver.find_element(By.XPATH, "//div[@class='ant-card-body']").is_displayed()
    print("Test delete task passed")
    driver.quit()

def test_loginX():
    sleep(5)
    driver.get("http://remin-der.th1.proen.cloud/")
    
    # click logout button
    logout_button = driver.find_element(By.XPATH, "//button[1]")
    logout_button.click()
    
    # login again
    sleep(5)
    login_button = driver.find_element(By.XPATH, "//button[1]")
    login_button.click()

    sleep(3)
    username_input = driver.find_element(By.XPATH, "//input[@name='identifier']")
    username_input.send_keys(GOOGLE_USERNAME)
    username_input.send_keys(Keys.ENTER)

    password_input = driver.find_element(By.XPATH, "//input[@name='password']")
    password_input.send_keys(GOOGLE_PASSWORD)
    password_input.send_keys(Keys.ENTER)
    
    sleep(5)
    assert driver.find_element(By.XPATH, "//h1[1]").text == "Remind-เด้อ"
    # sleep(999)
    print("Login Success")
    sleep(5)
    driver.quit()

test_addtask()
test_removetask()
#test_login()
