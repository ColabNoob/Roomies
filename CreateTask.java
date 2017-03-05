package com.example.llewellyn.roomie;

import android.app.Activity;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.RatingBar;
import android.widget.Spinner;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Llewellyn on 3/5/17.
 */

public class CreateTask extends Activity {

    private EditText title;
    private EditText des;
    private Spinner cat;
    private Spinner dd;
    private Spinner roomies;
    private RatingBar priority;
    private RatingBar effort;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.create_task);
        roomies=(Spinner) findViewById(R.id.roomies);
        cat=(Spinner) findViewById(R.id.cat);

        addItemsonCat();
        addItemsonRoomies();
    }

    private void addItemsonRoomies() {
        List<String> list = new ArrayList<String>();
        list.add("1");
        list.add("2");
        list.add("3");
        list.add("4");
        ArrayAdapter<String> dataAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, list);
        dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        roomies.setAdapter(dataAdapter);
    }

    private void addItemsonCat() {
        List<String> list = new ArrayList<String>();
        list.add("Shopping");
        list.add("Cooking");
        list.add("Cleaning");
        list.add("Fun");
        list.add("Walking the dog");
        ArrayAdapter<String> dataAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, list);
        dataAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        cat.setAdapter(dataAdapter);
    }

}
