
import argparse
import getpass
import logging
import re
import time
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor

# ==========================================
# OFFLINE BRUTEFORCE LAB
# Version: 1.0.0
# Python Edition
# ==========================================

APP_NAME = "OFFLINE BRUTEFORCE LAB"
VERSION = "1.0.0"

LOG_DIR = Path("Logs")
LOG_FILE = LOG_DIR / "offline_lab.log"

MAX_LOG_SIZE = 1024 * 1024  # 1 MB
LOG_MAX_AGE = 24 * 60 * 60  # 24 hours
MAX_WORKERS = 2


# ---------- Logging System ----------

def setup_logs():
    LOG_DIR.mkdir(exist_ok=True)

    now = time.time()

    for file in LOG_DIR.glob("*.log"):
        try:
            if now - file.stat().st_mtime > LOG_MAX_AGE:
                file.unlink()
        except OSError:
            pass

    if LOG_FILE.exists() and LOG_FILE.stat().st_size >= MAX_LOG_SIZE:
        LOG_FILE.write_text("", encoding="utf-8")

    logging.basicConfig(
        filename=LOG_FILE,
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
        force=True
    )


def log_event(message, level="info"):
    setup_logs()

    if level == "warning":
        logging.warning(message)
    elif level == "error":
        logging.error(message)
    else:
        logging.info(message)

    # Enforce the size limit after writing.
    if LOG_FILE.exists() and LOG_FILE.stat().st_size > MAX_LOG_SIZE:
        LOG_FILE.write_text("", encoding="utf-8")


# ---------- Interface ----------

def banner():
    print("""
==================================================
          OFFLINE BRUTEFORCE LAB
                 Python 1.0
==================================================

       [1] Password Strength Analyzer
       [2] Local Login Protection Demo
       [3] Performance Information
       [4] Exit

==================================================
""")


# ---------- Password Analyzer ----------

def analyze_password(password):
    score = 0
    findings = []

    if len(password) >= 12:
        score += 2
    elif len(password) >= 8:
        score += 1
    else:
        findings.append("Consider using at least 12 characters.")

    if re.search(r"[A-Z]", password):
        score += 1
    else:
        findings.append("Missing uppercase characters.")

    if re.search(r"[a-z]", password):
        score += 1
    else:
        findings.append("Missing lowercase characters.")

    if re.search(r"[0-9]", password):
        score += 1
    else:
        findings.append("Missing numbers.")

    if re.search(r"[^A-Za-z0-9]", password):
        score += 1
    else:
        findings.append("Missing special characters.")

    if score >= 6:
        rating = "STRONG"
    elif score >= 4:
        rating = "MODERATE"
    else:
        rating = "WEAK"

    return rating, findings


def password_analyzer():
    print("\nPASSWORD STRENGTH ANALYZER")
    password = getpass.getpass("Enter a test password: ")

    rating, findings = analyze_password(password)

    print(f"\nResult: {rating}")

    for finding in findings:
        print(f" - {finding}")

    print("\nYour password is not written to the log.")

    log_event("Password strength analysis completed.")


# ---------- Local Authentication Simulation ----------

class MockLoginSystem:

    def __init__(self, max_attempts=3):
        self.max_attempts = max_attempts
        self.attempts = 0
        self.locked = False

    def authenticate(self, guess):
        if self.locked:
            return "LOCKED"

        self.attempts += 1

        # This is a fixed, local demonstration credential.
        if guess == "ORBIT-42":
            return "SUCCESS"

        if self.attempts >= self.max_attempts:
            self.locked = True
            return "LOCKED"

        return "DENIED"


def local_demo():
    print("\nLOCAL LOGIN PROTECTION SIMULATION")
    print("This simulation uses a fictional login system.")
    print("No websites or external accounts are contacted.\n")

    login = MockLoginSystem(max_attempts=3)

    sample_guesses = [
        "WELCOME",
        "PASSWORD",
        "123456"
    ]

    for number, guess in enumerate(sample_guesses, start=1):
        result = login.authenticate(guess)

        print(f"Attempt {number}: {result}")

        if result == "LOCKED":
            print("\n[!] Account protection activated.")
            break

        time.sleep(0.2)

    print("\nSimulation completed.")

    log_event("Local authentication protection simulation completed.")


# ---------- Performance Information ----------

def performance_information():
    print("\nPERFORMANCE CONFIGURATION")
    print("-------------------------")
    print(f"Maximum background workers: {MAX_WORKERS}")
    print(f"Maximum log size: {MAX_LOG_SIZE // 1024} KB")
    print("Network requests: Disabled")
    print("Execution mode: Offline")

    log_event("Performance information viewed.")


def parallel_checks():
    # Small, bounded worker pool for independent local checks.
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        results = list(executor.map(
            lambda value: value * value,
            [2, 3]
        ))

    return results


# ---------- Main Program ----------

def main():
    setup_logs()

    print(f"\nStarting {APP_NAME} v{VERSION}")

    parallel_checks()

    while True:
        banner()

        choice = input("Select an option: ").strip()

        if choice == "1":
            password_analyzer()

        elif choice == "2":
            local_demo()

        elif choice == "3":
            performance_information()

        elif choice == "4":
            print("\nShutting down safely...")
            log_event("Application closed.")
            break

        else:
            print("\nInvalid selection.")

        input("\nPress ENTER to continue...")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nApplication interrupted.")
        log_event("Application interrupted.", "warning")
