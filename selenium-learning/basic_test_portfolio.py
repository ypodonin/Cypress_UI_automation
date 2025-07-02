from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Launch Chrome browser
driver = webdriver.Chrome()

# Open QA portfolio website
driver.get("https://qa.ypodonin.space")

# Wait for the page to load
time.sleep(2)

# Print the page title
print("Page Title:", driver.title)

# Verify the header text exists
header = driver.find_element(By.TAG_NAME, "h1")
print("Header Found:", header.text)

# Close the browser session
driver.quit()
