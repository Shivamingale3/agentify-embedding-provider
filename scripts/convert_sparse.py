import json
import os
import torch

state = torch.load("models/sparse_linear.pt", map_location="cpu", weights_only=True)

weight = state["weight"][0].float().tolist()
bias = state["bias"].float().item()

os.makedirs("assets", exist_ok=True)
with open("assets/sparse_linear.json", "w") as f:
    json.dump({"weight": weight, "bias": bias}, f)

print(len(weight), weight[:3], bias)
