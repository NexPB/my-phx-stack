# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :waypoint,
  ecto_repos: [Waypoint.Repo],
  generators: [timestamp_type: :utc_datetime]

# Configure the endpoint
config :waypoint, WaypointWeb.Endpoint,
  url: [host: "localhost"],
  adapter: Bandit.PhoenixAdapter,
  render_errors: [
    formats: [html: WaypointWeb.ErrorHTML, json: WaypointWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Waypoint.PubSub,
  live_view: [signing_salt: "HYF8xETG"]

# Configure the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :waypoint, Waypoint.Mailer, adapter: Swoosh.Adapters.Local

# Configure vite_phx
config :vite_phx,
  release_app: :waypoint,
  environment: config_env(),
  react: true

# Configure Inertia
config :inertia,
  endpoint: WaypointWeb.Endpoint,
  camelize_props: false,
  history: [encrypt: false],
  ssr: false

# Configure Elixir's Logger
config :logger, :default_formatter,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use built in Elixir JSON library for JSON parsing in Phoenix
config :phoenix, :json_library, JSON

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
