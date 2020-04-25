package fr.omatech.ordernow.web.rest;

import fr.omatech.ordernow.OrderNowApp;
import fr.omatech.ordernow.domain.RestaurantTable;
import fr.omatech.ordernow.repository.RestaurantTableRepository;
import fr.omatech.ordernow.service.RestaurantTableService;
import fr.omatech.ordernow.service.dto.RestaurantTableDTO;
import fr.omatech.ordernow.service.mapper.RestaurantTableMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.omatech.ordernow.domain.enumeration.TableStatus;
/**
 * Integration tests for the {@link RestaurantTableResource} REST controller.
 */
@SpringBootTest(classes = OrderNowApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class RestaurantTableResourceIT {

    private static final Integer DEFAULT_T_NUMBER = 1;
    private static final Integer UPDATED_T_NUMBER = 2;

    private static final TableStatus DEFAULT_T_STATUS = TableStatus.OPEN;
    private static final TableStatus UPDATED_T_STATUS = TableStatus.CLOSE;

    @Autowired
    private RestaurantTableRepository restaurantTableRepository;

    @Autowired
    private RestaurantTableMapper restaurantTableMapper;

    @Autowired
    private RestaurantTableService restaurantTableService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRestaurantTableMockMvc;

    private RestaurantTable restaurantTable;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RestaurantTable createEntity(EntityManager em) {
        RestaurantTable restaurantTable = new RestaurantTable()
            .tNumber(DEFAULT_T_NUMBER)
            .tStatus(DEFAULT_T_STATUS);
        return restaurantTable;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RestaurantTable createUpdatedEntity(EntityManager em) {
        RestaurantTable restaurantTable = new RestaurantTable()
            .tNumber(UPDATED_T_NUMBER)
            .tStatus(UPDATED_T_STATUS);
        return restaurantTable;
    }

    @BeforeEach
    public void initTest() {
        restaurantTable = createEntity(em);
    }

    @Test
    @Transactional
    public void createRestaurantTable() throws Exception {
        int databaseSizeBeforeCreate = restaurantTableRepository.findAll().size();

        // Create the RestaurantTable
        RestaurantTableDTO restaurantTableDTO = restaurantTableMapper.toDto(restaurantTable);
        restRestaurantTableMockMvc.perform(post("/api/restaurant-tables")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(restaurantTableDTO)))
            .andExpect(status().isCreated());

        // Validate the RestaurantTable in the database
        List<RestaurantTable> restaurantTableList = restaurantTableRepository.findAll();
        assertThat(restaurantTableList).hasSize(databaseSizeBeforeCreate + 1);
        RestaurantTable testRestaurantTable = restaurantTableList.get(restaurantTableList.size() - 1);
        assertThat(testRestaurantTable.gettNumber()).isEqualTo(DEFAULT_T_NUMBER);
        assertThat(testRestaurantTable.gettStatus()).isEqualTo(DEFAULT_T_STATUS);
    }

    @Test
    @Transactional
    public void createRestaurantTableWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = restaurantTableRepository.findAll().size();

        // Create the RestaurantTable with an existing ID
        restaurantTable.setId(1L);
        RestaurantTableDTO restaurantTableDTO = restaurantTableMapper.toDto(restaurantTable);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRestaurantTableMockMvc.perform(post("/api/restaurant-tables")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(restaurantTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RestaurantTable in the database
        List<RestaurantTable> restaurantTableList = restaurantTableRepository.findAll();
        assertThat(restaurantTableList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRestaurantTables() throws Exception {
        // Initialize the database
        restaurantTableRepository.saveAndFlush(restaurantTable);

        // Get all the restaurantTableList
        restRestaurantTableMockMvc.perform(get("/api/restaurant-tables?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(restaurantTable.getId().intValue())))
            .andExpect(jsonPath("$.[*].tNumber").value(hasItem(DEFAULT_T_NUMBER)))
            .andExpect(jsonPath("$.[*].tStatus").value(hasItem(DEFAULT_T_STATUS.toString())));
    }
    
    @Test
    @Transactional
    public void getRestaurantTable() throws Exception {
        // Initialize the database
        restaurantTableRepository.saveAndFlush(restaurantTable);

        // Get the restaurantTable
        restRestaurantTableMockMvc.perform(get("/api/restaurant-tables/{id}", restaurantTable.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(restaurantTable.getId().intValue()))
            .andExpect(jsonPath("$.tNumber").value(DEFAULT_T_NUMBER))
            .andExpect(jsonPath("$.tStatus").value(DEFAULT_T_STATUS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingRestaurantTable() throws Exception {
        // Get the restaurantTable
        restRestaurantTableMockMvc.perform(get("/api/restaurant-tables/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRestaurantTable() throws Exception {
        // Initialize the database
        restaurantTableRepository.saveAndFlush(restaurantTable);

        int databaseSizeBeforeUpdate = restaurantTableRepository.findAll().size();

        // Update the restaurantTable
        RestaurantTable updatedRestaurantTable = restaurantTableRepository.findById(restaurantTable.getId()).get();
        // Disconnect from session so that the updates on updatedRestaurantTable are not directly saved in db
        em.detach(updatedRestaurantTable);
        updatedRestaurantTable
            .tNumber(UPDATED_T_NUMBER)
            .tStatus(UPDATED_T_STATUS);
        RestaurantTableDTO restaurantTableDTO = restaurantTableMapper.toDto(updatedRestaurantTable);

        restRestaurantTableMockMvc.perform(put("/api/restaurant-tables")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(restaurantTableDTO)))
            .andExpect(status().isOk());

        // Validate the RestaurantTable in the database
        List<RestaurantTable> restaurantTableList = restaurantTableRepository.findAll();
        assertThat(restaurantTableList).hasSize(databaseSizeBeforeUpdate);
        RestaurantTable testRestaurantTable = restaurantTableList.get(restaurantTableList.size() - 1);
        assertThat(testRestaurantTable.gettNumber()).isEqualTo(UPDATED_T_NUMBER);
        assertThat(testRestaurantTable.gettStatus()).isEqualTo(UPDATED_T_STATUS);
    }

    @Test
    @Transactional
    public void updateNonExistingRestaurantTable() throws Exception {
        int databaseSizeBeforeUpdate = restaurantTableRepository.findAll().size();

        // Create the RestaurantTable
        RestaurantTableDTO restaurantTableDTO = restaurantTableMapper.toDto(restaurantTable);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRestaurantTableMockMvc.perform(put("/api/restaurant-tables")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(restaurantTableDTO)))
            .andExpect(status().isBadRequest());

        // Validate the RestaurantTable in the database
        List<RestaurantTable> restaurantTableList = restaurantTableRepository.findAll();
        assertThat(restaurantTableList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRestaurantTable() throws Exception {
        // Initialize the database
        restaurantTableRepository.saveAndFlush(restaurantTable);

        int databaseSizeBeforeDelete = restaurantTableRepository.findAll().size();

        // Delete the restaurantTable
        restRestaurantTableMockMvc.perform(delete("/api/restaurant-tables/{id}", restaurantTable.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RestaurantTable> restaurantTableList = restaurantTableRepository.findAll();
        assertThat(restaurantTableList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
