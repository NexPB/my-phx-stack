defmodule Waypoint.Repo do
  use Ecto.Repo,
    otp_app: :waypoint,
    adapter: Ecto.Adapters.Postgres
end
