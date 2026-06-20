from app.config.extensions import db
from app.models import SavedBowlIngredient


def create_snapshot_records(saved_bowl_id, ingredients):
    snapshots = [
        create_snapshot_record(saved_bowl_id, ingredient)
        for ingredient in ingredients
    ]
    db.session.add_all(snapshots)
    return snapshots


def create_snapshot_record(saved_bowl_id, ingredient):
    category = ingredient.category
    return SavedBowlIngredient(
        saved_bowl_id=saved_bowl_id,
        ingredient_id=ingredient.id,
        category_id=category.id,
        ingredient_name_snapshot=ingredient.name,
        category_name_snapshot=category.name,
        category_slug_snapshot=category.slug,
        color_key_snapshot=category.color_key,
        shape_family_snapshot=category.shape_family,
        visual_pattern_snapshot=ingredient.visual_pattern,
        sort_order_snapshot=category.sort_order,
    )


def serialize_snapshot(snapshot):
    return {
        "id": snapshot.id,
        "saved_bowl_id": snapshot.saved_bowl_id,
        "ingredient_id": snapshot.ingredient_id,
        "category_id": snapshot.category_id,
        "name": snapshot.ingredient_name_snapshot,
        "ingredient_name_snapshot": snapshot.ingredient_name_snapshot,
        "category": {
            "id": snapshot.category_id,
            "name": snapshot.category_name_snapshot,
            "slug": snapshot.category_slug_snapshot,
            "color_key": snapshot.color_key_snapshot,
            "shape_family": snapshot.shape_family_snapshot,
            "sort_order": snapshot.sort_order_snapshot,
        },
        "visual_pattern": snapshot.visual_pattern_snapshot,
        "snapshots": {
            "ingredient_name": snapshot.ingredient_name_snapshot,
            "category_name": snapshot.category_name_snapshot,
            "category_slug": snapshot.category_slug_snapshot,
            "color_key": snapshot.color_key_snapshot,
            "shape_family": snapshot.shape_family_snapshot,
            "visual_pattern": snapshot.visual_pattern_snapshot,
            "sort_order": snapshot.sort_order_snapshot,
        },
    }


def serialize_snapshots(snapshots):
    return [
        serialize_snapshot(snapshot)
        for snapshot in sorted(
            snapshots,
            key=lambda snapshot: (
                snapshot.sort_order_snapshot,
                snapshot.ingredient_name_snapshot.lower(),
                snapshot.id or 0,
            ),
        )
    ]
