defmodule WaypointWeb.DemoController do
  use WaypointWeb, :controller

  def page_a(conn, _params) do
    conn
    |> assign(:page_title, "Demo A")
    |> render_inertia("DemoA")
  end

  def page_b(conn, _params) do
    conn
    |> assign_prop(:message, "Hello from Phoenix!")
    |> assign_prop(:timestamp, DateTime.utc_now() |> DateTime.to_string())
    |> assign(:page_title, "Demo B")
    |> render_inertia("DemoB")
  end
end
