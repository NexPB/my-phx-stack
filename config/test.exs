import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :waypoint, Waypoint.Repo,
  username: "postgres",
  password: "secret",
  hostname: "localhost",
  database: "waypoint_test#{System.get_env("MIX_TEST_PARTITION")}",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: System.schedulers_online() * 2

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :waypoint, WaypointWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "aC5lWY6cch1sqcbPJ44i+3n8Pohdi0ehqZcGKBNVrDwoYiUB4vwFID5daOF5GI5d",
  server: false

# In test we don't send emails
config :waypoint, Waypoint.Mailer, adapter: Swoosh.Adapters.Test

# Disable swoosh api client as it is only required for production adapters
config :swoosh, :api_client, false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime

# Sort query params output of verified routes for robust url comparisons
config :phoenix,
  sort_verified_routes_query_params: true

# Use pre-built Vite assets in test (no dev server needed for e2e)
config :vite_phx, environment: :prod
