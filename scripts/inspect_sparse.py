import torch

state = torch.load("models/sparse_linear.pt")

print(type(state))

for key, value in state.items():
  print(key, value.shape, value.dtype)