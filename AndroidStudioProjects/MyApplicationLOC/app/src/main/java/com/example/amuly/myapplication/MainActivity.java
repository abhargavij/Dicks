package com.example.amuly.myapplication;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.params.ConnRoutePNames;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONArray;
import org.json.JSONObject;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.ListView;

public class MainActivity extends AppCompatActivity {

    ListView listView;
    ArrayList<String> tutorialList = new ArrayList<String>();

    private final static String URL = "https://movesync-qa.dcsg.com/dsglabs/mobile/api/venue/";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        new FetchDataTask().execute(URL);
    }
    private class FetchDataTask extends AsyncTask<String, Void, String>{

        @Override
        protected String doInBackground(String... params) {

            InputStream inputStream = null;
            String result= null;
            HttpClient client = new DefaultHttpClient();
            HttpGet httpGet = new HttpGet(params[0]);

            try {

                HttpResponse response = client.execute(httpGet);
                inputStream = response.getEntity().getContent();

                // convert inputstream to string
                if(inputStream != null){
                    result = convertInputStreamToString(inputStream);
                    Log.i("App", "Data received:" +result);

                }
                else
                    result = "Failed to fetch data";

                return result;

            } catch (ClientProtocolException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            return null;
        }

        @Override
        protected void onPostExecute(String dataFetched) {
            //parse the JSON data and then display
            parseJSON(dataFetched);
        }

        private String convertInputStreamToString(InputStream inputStream) throws IOException{
            BufferedReader bufferedReader = new BufferedReader( new InputStreamReader(inputStream));
            String line = "";
            String result = "";
            while((line = bufferedReader.readLine()) != null)
                result += line;

            inputStream.close();
            return result;

        }

        private void parseJSON(String data){

            try
            {
                JSONObject object = new JSONObject(data);
                JSONArray Jarray  = object.getJSONArray("venues");
                for (int i = 0; i < Jarray.length(); i++)
                {
                    JSONObject Jasonobject = Jarray.getJSONObject(i);
                if(Jasonobject.has("location"))
                    {
                        JSONObject JasonSubobject =Jasonobject.getJSONObject("location");
                        String postTitle = JasonSubobject.getString("city");
                        tutorialList.add(postTitle);
                    }
                }
                //Get ListView object from xml
                listView = (ListView) findViewById(R.id.list);

                // Define a new Adapter
                ArrayAdapter<String> adapter = new ArrayAdapter<String>(MainActivity.this, android.R.layout.simple_list_item_1, android.R.id.text1, tutorialList);

                // Assign adapter to ListView
                listView.setAdapter(adapter);

            }
            catch(Exception e)
            {
                Log.i("App", "Error parsing data" +e.getMessage());

            }
        }
    }
}
