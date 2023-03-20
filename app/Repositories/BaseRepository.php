<?php

namespace App\Repositories;

use App\Services\Constants;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository
{

  /**
   * The model instance
   *
   * @var Model $model
   */
  protected Model $model;

  /**
   * Get the number of records
   *
   * @return int
   */
  public function getCount(): int
  {
    return $this->model->count();
  }

  /**
   * Get all Models from store
   *
   * @return Collection
   */
  public function getAll(): Collection
  {
    return $this->model->all();
  }

  /**
   * Store a new Model in store
   *
   * @param array $attributes
   * @return Model
   */
  public function create(array $attributes): Model
  {
    return $this->model->create($attributes);
  }

  /**
   * Get Model by Id
   *
   * @param $id
   * @return Model|null
   */
  public function findById($id): ?Model
  {
    return $this->model->find($id)->first();
  }

  /**
   * Find a Model with a condition
   */
  public function findWhere(string $field, string $operator, string $value)
  {
    return $this->model->where($field, $operator, $value)->first();
  }

  /**
   * Update the Model
   *
   * @param array $input
   * @param Model $model
   * @return Model
   */
  public function update(array $input, Model $model): Model
  {
    $this->model = $model;
    $this->model->update($input);
    $this->model->save();

    return $this->model;
  }

  /**
   * Delete the Model record by Id
   *
   * @param $id
   * @return bool
   */
  public function destroyById($id): bool
  {
    return $this->findById($id)->delete();
  }

  /**
   * Record Model as deleted
   *
   * @param Model $model
   */
  public function destroyRecord(Model $model)
  {
    $this->model = $model;
    $this->model->status = Constants::DELETED;
    $this->model->deleted_at = Carbon::now();
    $this->model->save();
  }

}
