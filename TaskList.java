package com.example.llewellyn.roomie;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;

import java.util.ArrayList;

import static android.R.attr.button;

/**
 * Created by Llewellyn on 3/4/17.
 */

public class TaskList extends Activity {
    private ArrayList<String> items;
    private ArrayAdapter<String> itemsAdapter;
    private ListView lvItems;
    private FloatingActionButton fab;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.task_list);
        lvItems = (ListView) findViewById(R.id.list);
        items = new ArrayList<String>();
        fab = (FloatingActionButton) findViewById(R.id.fab);
        itemsAdapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1, items);
        lvItems.setAdapter(itemsAdapter);
        items.add("Grocery shopping");
        items.add("Walking the dog");
        addListenerOnButton();

    }

    public void addListenerOnButton() {

        final Context context = this;

        fab.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View arg0) {

                Intent intent = new Intent(context, CreateTask.class);
                startActivity(intent);

            }

        });
    }
}
