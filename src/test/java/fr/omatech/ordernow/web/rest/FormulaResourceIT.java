package fr.omatech.ordernow.web.rest;

import fr.omatech.ordernow.OrderNowApp;
import fr.omatech.ordernow.domain.Formula;
import fr.omatech.ordernow.repository.FormulaRepository;
import fr.omatech.ordernow.service.FormulaService;
import fr.omatech.ordernow.service.dto.FormulaDTO;
import fr.omatech.ordernow.service.mapper.FormulaMapper;

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
import java.math.BigDecimal;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FormulaResource} REST controller.
 */
@SpringBootTest(classes = OrderNowApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class FormulaResourceIT {

    private static final String DEFAULT_LABEL = "AAAAAAAAAA";
    private static final String UPDATED_LABEL = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRICE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRICE = new BigDecimal(2);

    @Autowired
    private FormulaRepository formulaRepository;

    @Autowired
    private FormulaMapper formulaMapper;

    @Autowired
    private FormulaService formulaService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFormulaMockMvc;

    private Formula formula;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Formula createEntity(EntityManager em) {
        Formula formula = new Formula()
            .label(DEFAULT_LABEL)
            .price(DEFAULT_PRICE);
        return formula;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Formula createUpdatedEntity(EntityManager em) {
        Formula formula = new Formula()
            .label(UPDATED_LABEL)
            .price(UPDATED_PRICE);
        return formula;
    }

    @BeforeEach
    public void initTest() {
        formula = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormula() throws Exception {
        int databaseSizeBeforeCreate = formulaRepository.findAll().size();

        // Create the Formula
        FormulaDTO formulaDTO = formulaMapper.toDto(formula);
        restFormulaMockMvc.perform(post("/api/formulas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formulaDTO)))
            .andExpect(status().isCreated());

        // Validate the Formula in the database
        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeCreate + 1);
        Formula testFormula = formulaList.get(formulaList.size() - 1);
        assertThat(testFormula.getLabel()).isEqualTo(DEFAULT_LABEL);
        assertThat(testFormula.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createFormulaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formulaRepository.findAll().size();

        // Create the Formula with an existing ID
        formula.setId(1L);
        FormulaDTO formulaDTO = formulaMapper.toDto(formula);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormulaMockMvc.perform(post("/api/formulas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formulaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Formula in the database
        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFormulas() throws Exception {
        // Initialize the database
        formulaRepository.saveAndFlush(formula);

        // Get all the formulaList
        restFormulaMockMvc.perform(get("/api/formulas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formula.getId().intValue())))
            .andExpect(jsonPath("$.[*].label").value(hasItem(DEFAULT_LABEL)))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())));
    }
    
    @Test
    @Transactional
    public void getFormula() throws Exception {
        // Initialize the database
        formulaRepository.saveAndFlush(formula);

        // Get the formula
        restFormulaMockMvc.perform(get("/api/formulas/{id}", formula.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(formula.getId().intValue()))
            .andExpect(jsonPath("$.label").value(DEFAULT_LABEL))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingFormula() throws Exception {
        // Get the formula
        restFormulaMockMvc.perform(get("/api/formulas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormula() throws Exception {
        // Initialize the database
        formulaRepository.saveAndFlush(formula);

        int databaseSizeBeforeUpdate = formulaRepository.findAll().size();

        // Update the formula
        Formula updatedFormula = formulaRepository.findById(formula.getId()).get();
        // Disconnect from session so that the updates on updatedFormula are not directly saved in db
        em.detach(updatedFormula);
        updatedFormula
            .label(UPDATED_LABEL)
            .price(UPDATED_PRICE);
        FormulaDTO formulaDTO = formulaMapper.toDto(updatedFormula);

        restFormulaMockMvc.perform(put("/api/formulas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formulaDTO)))
            .andExpect(status().isOk());

        // Validate the Formula in the database
        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeUpdate);
        Formula testFormula = formulaList.get(formulaList.size() - 1);
        assertThat(testFormula.getLabel()).isEqualTo(UPDATED_LABEL);
        assertThat(testFormula.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingFormula() throws Exception {
        int databaseSizeBeforeUpdate = formulaRepository.findAll().size();

        // Create the Formula
        FormulaDTO formulaDTO = formulaMapper.toDto(formula);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormulaMockMvc.perform(put("/api/formulas")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formulaDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Formula in the database
        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFormula() throws Exception {
        // Initialize the database
        formulaRepository.saveAndFlush(formula);

        int databaseSizeBeforeDelete = formulaRepository.findAll().size();

        // Delete the formula
        restFormulaMockMvc.perform(delete("/api/formulas/{id}", formula.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
