<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VisitorGuest extends Model
{
    /**
     * Database table name
     */
    protected $table = 'visitor_guests';

     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'phone',
    ];
}
