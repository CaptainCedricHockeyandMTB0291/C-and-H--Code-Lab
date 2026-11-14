
import java.io.IOException;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.*;
import java.util.regex.Pattern;

public class OfflineBruteForceLab {

    private static final String APP_NAME =
            "OFFLINE BRUTEFORCE LAB";

    private static final String VERSION = "1.0.0";

    private static final Path LOG_DIR = Paths.get("Logs");

    private static final Path LOG_FILE =
            LOG_DIR.resolve("java_lab.log");

    private static final long MAX_LOG_SIZE = 1024 * 1024;

    private static final long MAX_LOG_AGE =
            24L * 60 * 60 * 1000;

    private static final int MAX_WORKERS = 2;

    // ==========================================
    // LOGGING SYSTEM
    // ==========================================

    private static void setupLogs() {

        try {
            Files.createDirectories(LOG_DIR);

            long now = System.currentTimeMillis();

            try (DirectoryStream<Path> files =
                    Files.newDirectoryStream(LOG_DIR, "*.log")) {

                for (Path file : files) {
                    long modified =
                            Files.getLastModifiedTime(file)
                                    .toMillis();

                    if (now - modified > MAX_LOG_AGE) {
                        Files.deleteIfExists(file);
                    }
                }
            }

            if (Files.exists(LOG_FILE)
                    && Files.size(LOG_FILE) >= MAX_LOG_SIZE) {
                Files.writeString(
                        LOG_FILE,
                        "",
                        StandardCharsets.UTF_8
                );
            }

        } catch (IOException e) {
            System.out.println("Log initialization failed.");
        }
    }

    private static synchronized void log(String message) {

        setupLogs();

        try {
            String entry =
                    Instant.now() + " | " + message
                            + System.lineSeparator();

            Files.writeString(
                    LOG_FILE,
                    entry,
                    StandardCharsets.UTF_8,
                    StandardOpenOption.CREATE,
                    StandardOpenOption.APPEND
            );

            if (Files.size(LOG_FILE) > MAX_LOG_SIZE) {
                Files.writeString(
                        LOG_FILE,
                        "",
                        StandardCharsets.UTF_8
                );
            }

        } catch (IOException e) {
            System.out.println("Logging unavailable.");
        }
    }

    // ==========================================
    // PASSWORD ANALYZER
    // ==========================================

    private static void analyzePassword() {

        java.io.Console console = System.console();

        if (console == null) {
            System.out.println(
                    "Run this program in a terminal "
                    + "to use secure password input."
            );
            return;
        }

        char[] password =
                console.readPassword("Test password: ");

        String value = new String(password);

        int score = 0;

        if (value.length() >= 12) score += 2;
        else if (value.length() >= 8) score++;

        if (Pattern.compile("[A-Z]").matcher(value).find())
            score++;

        if (Pattern.compile("[a-z]").matcher(value).find())
            score++;

        if (Pattern.compile("[0-9]").matcher(value).find())
            score++;

        if (Pattern.compile("[^A-Za-z0-9]").matcher(value).find())
            score++;

        String rating;

        if (score >= 6)
            rating = "STRONG";
        else if (score >= 4)
            rating = "MODERATE";
        else
            rating = "WEAK";

        System.out.println("\nPassword rating: " + rating);

        System.out.println(
                "Analysis completed. Password not logged."
        );

        java.util.Arrays.fill(password, '\0');

        log("Password analysis completed.");
    }

    // ==========================================
    // LOCAL LOGIN SIMULATOR
    // ==========================================

    static class MockLogin {

        private final int maxAttempts;

        private int attempts = 0;

        private boolean locked = false;

        MockLogin(int maxAttempts) {
            this.maxAttempts = maxAttempts;
        }

        public synchronized String authenticate(String guess) {

            if (locked) return "LOCKED";

            attempts++;

            // Fictional local demonstration credential.
            if (guess.equals("ORBIT-42")) {
                return "SUCCESS";
            }

            if (attempts >= maxAttempts) {
                locked = true;
                return "LOCKED";
            }

            return "DENIED";
        }
    }

    private static void runDemo() {

        System.out.println("\nLOCAL LOGIN SIMULATION");

        System.out.println(
                "Fictional system. No external accounts contacted."
        );

        MockLogin login = new MockLogin(3);

        List<String> guesses = List.of(
                "WELCOME",
                "PASSWORD",
                "123456"
        );

        int number = 1;

        for (String guess : guesses) {

            String result = login.authenticate(guess);

            System.out.println(
                    "Attempt " + number + ": " + result
            );

            number++;

            if (result.equals("LOCKED")) {
                System.out.println(
                        "\nAccount protection activated."
                );
                break;
            }

            try {
                Thread.sleep(200);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            }
        }

        log("Local authentication simulation completed.");
    }

    // ==========================================
    // PERFORMANCE SYSTEM
    // ==========================================

    private static void performanceInfo() {

        System.out.println("\nPERFORMANCE CONFIGURATION");
        System.out.println("-------------------------");

        System.out.println("Maximum workers: " + MAX_WORKERS);

        System.out.println("Maximum log size: 1024 KB");

        System.out.println("Network access: Disabled");

        System.out.println("Mode: Offline");

        log("Performance information viewed.");
    }

    private static void parallelChecks() {

        ExecutorService executor =
                Executors.newFixedThreadPool(MAX_WORKERS);

        try {

            Future<Integer> first =
                    executor.submit(() -> 2 * 2);

            Future<Integer> second =
                    executor.submit(() -> 3 * 3);

            first.get();
            second.get();

        } catch (Exception e) {
            log("Background check interrupted.");
        } finally {
            executor.shutdown();
        }
    }

    // ==========================================
    // MAIN INTERFACE
    // ==========================================

    private static void banner() {

        System.out.println("""
        ==========================================
                OFFLINE BRUTEFORCE LAB
                     Java 1.0
        ==========================================

        [1] Password Strength Analyzer
        [2] Local Login Protection Demo
        [3] Performance Information
        [4] Exit

        ==========================================
        """);
    }

    public static void main(String[] args) {

        setupLogs();

        System.out.println(
                "Starting " + APP_NAME + " v" + VERSION
        );

        parallelChecks();

        java.util.Scanner scanner =
                new java.util.Scanner(System.in);

        boolean running = true;

        while (running) {

            banner();

            System.out.print("Select an option: ");

            String choice = scanner.nextLine().trim();

            switch (choice) {

                case "1":
                    analyzePassword();
                    break;

                case "2":
                    runDemo();
                    break;

                case "3":
                    performanceInfo();
                    break;

                case "4":
                    System.out.println(
                            "Shutting down safely..."
                    );

                    log("Application closed.");

                    running = false;
                    break;

                default:
                    System.out.println("Invalid selection.");
            }

            if (running) {
                System.out.println(
                        "\nPress ENTER to continue."
                );
                scanner.nextLine();
            }
        }

        scanner.close();
    }
}
