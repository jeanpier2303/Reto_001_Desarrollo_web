from pydantic import BaseModel, Field

class ProductBase(BaseModel):
    name: str = Field(..., example="Camiseta")
    price: float = Field(..., example=19.99)
    stock: int = Field(..., example=10)
    available: bool = Field(default=True, example=True)  #

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int
    class Config:
        orm_mode = True
