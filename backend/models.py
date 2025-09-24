from sqlalchemy import Column, Integer, String, Numeric, Boolean
from .database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    price = Column(Numeric(10,2), nullable=False, default=0.00)
    stock = Column(Integer, nullable=False, default=0)
    available = Column(Boolean, nullable=False, default=True)  # si hay o no hay 