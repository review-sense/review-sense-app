from flask import Blueprint
from places.utils import get_all_places

main = Blueprint("Places", __name__)


@main.get("/api/places/all-places")
def get_places():
    return get_all_places()
