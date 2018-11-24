# API

Basics:

- spot = charging point
- connector = chargin point connector
- userid = any string you want
- spotid = any string you want

If error, API returns `{ok: false}`

**Get status**

```
GET https://api.teamglados.com/

{
  ok: true
}
```

**Get history**

Returns all completed charging transactions.

```
GET https://api.teamglados.com/history/<userid>

[
  {
    ok: True,
    duration: <duration in minutes>,
    charging_cost: <charging cost in €>,
    parking_cost: <parking cost in €>
  },
  ...
]
```

**Get spot status**

Returns automatically selected valid spot status

```
GET https://api.teamglados.com/spot/status/<spotid>
{
  identifier: '<currently active spot identifier>',
  connectors: [
    {
      status: 'Unavailable'
    },
    {
      status: 'Available'
    },
    {
      status: 'Pending'
    },
    {
      status: 'Charging'
    }
  ]
}
```

Unavailable = light is red  
Available = light is green  
Pending = light is green, awaiting car to start charging  
Charging = light is blue  

**Start charging**

Starts charging when spot has become available by license plate detection.

```
POST https://api.teamglados.com/spot/start/<spotid>
{
  ok: true
}
```

When start charging, need to put controller from A to C mode for charging to start and light to turn blue.

**Stop charging**

Stops charging and spot will become unavailable (light turns red)

```
POST https://api.teamglados.com/spot/stop/<spotid>
{
  ok: true
}
```
