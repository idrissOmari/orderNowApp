package fr.omatech.ordernow.web.rest;

import fr.omatech.ordernow.OrderNowApp;
import fr.omatech.ordernow.domain.FormulaOrder;
import fr.omatech.ordernow.repository.FormulaOrderRepository;
import fr.omatech.ordernow.service.FormulaOrderService;
import fr.omatech.ordernow.service.dto.FormulaOrderDTO;
import fr.omatech.ordernow.service.mapper.FormulaOrderMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FormulaOrderResource} REST controller.
 */
@SpringBootTest(classes = OrderNowApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class FormulaOrderResourceIT {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    @Autowired
    private FormulaOrderRepository formulaOrderRepository;

    @Mock
    private FormulaOrderRepository formulaOrderRepositoryMock;

    @Autowired
    private FormulaOrderMapper formulaOrderMapper;

    @Mock
    private FormulaOrderService formulaOrderServiceMock;

    @Autowired
    private FormulaOrderService formulaOrderService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFormulaOrderMockMvc;

    private FormulaOrder formulaOrder;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FormulaOrder createEntity(EntityManager em) {
        FormulaOrder formulaOrder = new FormulaOrder()
            .quantity(DEFAULT_QUANTITY);
        return formulaOrder;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FormulaOrder createUpdatedEntity(EntityManager em) {
        FormulaOrder formulaOrder = new FormulaOrder()
            .quantity(UPDATED_QUANTITY);
        return formulaOrder;
    }

    @BeforeEach
    public void initTest() {
        formulaOrder = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormulaOrder() throws Exception {
        int databaseSizeBeforeCreate = formulaOrderRepository.findAll().size();

        // Create the FormulaOrder
        FormulaOrderDTO formulaOrderDTO = formulaOrderMapper.toDto(formulaOrder);
        restFormulaOrderMockMvc.perform(post("/api/formula-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formulaOrderDTO)))
            .andExpect(status().isCreated());

        // Validate the FormulaOrder in the database
        List<FormulaOrder> formulaOrderList = formulaOrderRepository.findAll();
        assertThat(formulaOrderList).hasSize(databaseSizeBeforeCreate + 1);
        FormulaOrder testFormulaOrder = formulaOrderList.get(formulaOrderList.size() - 1);
        assertThat(testFormulaOrder.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    public void createFormulaOrderWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formulaOrderRepository.findAll().size();

        // Create the FormulaOrder with an existing ID
        formulaOrder.setId(1L);
        FormulaOrderDTO formulaOrderDTO = formulaOrderMapper.toDto(formulaOrder);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormulaOrderMockMvc.perform(post("/api/formula-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formulaOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FormulaOrder in the database
        List<FormulaOrder> formulaOrderList = formulaOrderRepository.findAll();
        assertThat(formulaOrderList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFormulaOrders() throws Exception {
        // Initialize the database
        formulaOrderRepository.saveAndFlush(formulaOrder);

        // Get all the formulaOrderList
        restFormulaOrderMockMvc.perform(get("/api/formula-orders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formulaOrder.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllFormulaOrdersWithEagerRelationshipsIsEnabled() throws Exception {
        when(formulaOrderServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFormulaOrderMockMvc.perform(get("/api/formula-orders?eagerload=true"))
            .andExpect(status().isOk());

        verify(formulaOrderServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllFormulaOrdersWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(formulaOrderServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFormulaOrderMockMvc.perform(get("/api/formula-orders?eagerload=true"))
            .andExpect(status().isOk());

        verify(formulaOrderServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getFormulaOrder() throws Exception {
        // Initialize the database
        formulaOrderRepository.saveAndFlush(formulaOrder);

        // Get the formulaOrder
        restFormulaOrderMockMvc.perform(get("/api/formula-orders/{id}", formulaOrder.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(formulaOrder.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    public void getNonExistingFormulaOrder() throws Exception {
        // Get the formulaOrder
        restFormulaOrderMockMvc.perform(get("/api/formula-orders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormulaOrder() throws Exception {
        // Initialize the database
        formulaOrderRepository.saveAndFlush(formulaOrder);

        int databaseSizeBeforeUpdate = formulaOrderRepository.findAll().size();

        // Update the formulaOrder
        FormulaOrder updatedFormulaOrder = formulaOrderRepository.findById(formulaOrder.getId()).get();
        // Disconnect from session so that the updates on updatedFormulaOrder are not directly saved in db
        em.detach(updatedFormulaOrder);
        updatedFormulaOrder
            .quantity(UPDATED_QUANTITY);
        FormulaOrderDTO formulaOrderDTO = formulaOrderMapper.toDto(updatedFormulaOrder);

        restFormulaOrderMockMvc.perform(put("/api/formula-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formulaOrderDTO)))
            .andExpect(status().isOk());

        // Validate the FormulaOrder in the database
        List<FormulaOrder> formulaOrderList = formulaOrderRepository.findAll();
        assertThat(formulaOrderList).hasSize(databaseSizeBeforeUpdate);
        FormulaOrder testFormulaOrder = formulaOrderList.get(formulaOrderList.size() - 1);
        assertThat(testFormulaOrder.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    public void updateNonExistingFormulaOrder() throws Exception {
        int databaseSizeBeforeUpdate = formulaOrderRepository.findAll().size();

        // Create the FormulaOrder
        FormulaOrderDTO formulaOrderDTO = formulaOrderMapper.toDto(formulaOrder);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormulaOrderMockMvc.perform(put("/api/formula-orders")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formulaOrderDTO)))
            .andExpect(status().isBadRequest());

        // Validate the FormulaOrder in the database
        List<FormulaOrder> formulaOrderList = formulaOrderRepository.findAll();
        assertThat(formulaOrderList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFormulaOrder() throws Exception {
        // Initialize the database
        formulaOrderRepository.saveAndFlush(formulaOrder);

        int databaseSizeBeforeDelete = formulaOrderRepository.findAll().size();

        // Delete the formulaOrder
        restFormulaOrderMockMvc.perform(delete("/api/formula-orders/{id}", formulaOrder.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FormulaOrder> formulaOrderList = formulaOrderRepository.findAll();
        assertThat(formulaOrderList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
