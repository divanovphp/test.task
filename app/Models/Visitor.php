<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{

    /**
     * Database table name
     */
    protected $table = 'visitors';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'phone',
        'country',
        'weather'
    ];

     /**
     * Get the guests for the visitor.
     */
    public function guests()
    {
        return $this->hasMany(VisitorGuest::class);
    }
}
