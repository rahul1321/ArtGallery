<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $about = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus vel
        tenetur explicabo necessitatibus, ad soluta consectetur illo qui voluptatem. 
        Quis soluta maiores eum. Iste modi voluptatum in repudiandae fugiat suscipit dolorum harum,
        porro voluptate quis? Alias repudiandae dicta doloremque voluptates soluta repellendus, 
        unde laborum quo nam, ullam facere voluptatem similique.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque praesentium maiores suscipit,
        ipsum repellat. Commodi numquam voluptas, consectetur itaque, 
        fugit quisquam expedita fugiat, nulla ipsum inventore neque alias aperiam dicta.
        ";
        DB::table('profiles')->insert([
            'name' => 'Dipto Shill',
            'email' => 'dipto@gmail.com',
            'address' => '203 Fake St. Mountain View, San Francisco, California, USA',
            'phone' => '+1 232 3235 324',
            'image' => 'profile_pic.png',
            'about' => $about,
            'facebook_link' => '',
            'youtube_link' => '',
            'instagram_link' => '',
            'created_at'=>date('Y-m-d H:i:s'),
            'updated_at'=>date('Y-m-d H:i:s'),
        ]);
    }
}
