defmodule Waypoint.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      WaypointWeb.Telemetry,
      Waypoint.Repo,
      {DNSCluster, query: Application.get_env(:waypoint, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Waypoint.PubSub},
      # Start a worker by calling: Waypoint.Worker.start_link(arg)
      # {Waypoint.Worker, arg},
      # Start to serve requests, typically the last entry
      WaypointWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Waypoint.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    WaypointWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
