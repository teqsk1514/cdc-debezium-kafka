#!/bin/bash

mongo <<EOF
use admin

db.createUser(
{
user: "debeziumUser",
pwd: "debeziumUser",
roles: ["dbOwner"]
}
)
EOF